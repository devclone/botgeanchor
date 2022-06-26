import query from "./service/wax-query.js";
import historyTransaction from "./service/wax-transaction.js";
import { login, mine, removepilot, restorepilot, insertpilot, removeship, rechargeship, repairship, insertship, rutBO, rutSR, repair, recover, withdraw } from "./galactic.js";
import { toCamelCase } from "./utils.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const accounts = require("./accounts.json");
const MAX_DELAY = 3600; // 1 hour
const {
    REPAIR_IF_DURABILITY_LOWER,
    RECOVER_IF_ENERGY_LOWER,
    LOWEST_ENERGY,
    PAYBW,
    MINIMUM_FEE,
    MINIMUN_WITHDRAW,
    TIMEZONE,
    WITHDRAWABLE,
} = require("./config.json");

function queryData(wallet) {
    return query({
        json: true,
        code: "farmersworld",
        scope: "farmersworld",
        table: "tools",
        lower_bound: "focvu.wam",
        upper_bound: "focvu.wam",
        index_position: 2,
        key_type: "i64",
        limit: "100",
        reverse: false,
        show_payer: false,
    });
}

/*
 * Check withdraw fee is equal target
 *
 * @param target number
 *
 * @return bool
 */
async function isWithdrawFeeEqual(target = 5) {
    const data = await query({
        json: true,
        code: "farmersworld",
        scope: "farmersworld",
        table: "config",
        lower_bound: null,
        upper_bound: null,
        index_position: 1,
        key_type: "",
        limit: "100",
        reverse: false,
        show_payer: false,
    });

    if (!data || data.rows.length === 0) return false;

    console.log("Current withdraw fee", data.rows[0].fee);

    return data.rows[0].fee === target;
}

/*
 * Check number of GET token in account
 *
 * @return number of GET
 */
async function getTokenGET(wallet) {
    const data = await query({
        json: true,
        code: "galacticescp",
        scope: wallet,
        table: "accounts",
        // lower_bound: null,
        // upper_bound: null,
        index_position: 1,
        key_type: "i64",
        limit: 1,
        reverse: true,
        show_payer: false
    });
    // console.log(data);
    if (!data || data.rows.length === 0) return false;
    console.log("GET token = ", parseFloat(data.rows[0].balance));
    return parseFloat(data.rows[0].balance);
}

/*
 * Check number of GET token in account
 *
 * @return number of GET   "focvu.wam"
 */
async function getTokenGala(wallet) {
    const data = await query({
        json: true,
        code: "galacticgame",
        scope: "galacticgame",
        table: "profiles",
        lower_bound: wallet,
        upper_bound: wallet,
        index_position: 1,
        key_type: "i64",
        limit: 1,
        reverse: true,
        show_payer: false
    });
    // console.log(data);
    if (!data || data.rows.length === 0) return false;
    console.log("AE token = ", parseFloat(data.rows[0].ae));
    console.log("BO token = ", parseFloat(data.rows[0].bo));
    console.log("SR token = ", parseFloat(data.rows[0].sr));


    if(parseFloat(data.rows[0].bo) > 40) {
        let rutBO = parseFloat( data.rows[0].bo) - 9
        await rutBO(rutBO)
    }
    if(parseFloat(data.rows[0].sr) > 40) {
        let rutSR = parseFloat(data.rows[0].sr) - 9
        await rutSR(rutSR)
    }

    return data.rows.length
}



/*
 * Get reward after claim
 *
 * @return string
 */
async function logClaim(trxId) {
    try {
        const trans = await historyTransaction(trxId);
        const traces = trans.traces.find((r) => r.act.name === "logclaim");
        const rewards = traces.act.data.rewards;

        return rewards && rewards instanceof Array ? rewards.join(" - ") : "";
    } catch {
        return "";
    }
}

async function delay(ms = 1000) {
    return new Promise((r) => setTimeout(r, ms));
}

async function countdown(seconds) {
    for (let i = seconds; i > 0; i--) {
        process.stdout.write("\r");
        process.stdout.write(` -> ${i} seconds remaining...`);

        await delay(1000);
    }

    process.stdout.write("\n");
}

async function getAccount(wallet) {
    const data = await query({
        json: true,
        code: "farmersworld",
        scope: "farmersworld",
        table: "accounts",
        lower_bound: wallet,
        upper_bound: wallet,
        index_position: 1,
        key_type: "",
        limit: "100",
        reverse: false,
        show_payer: false,
    });

    return data && data.rows.length > 0 ? data.rows[0] : null;
}


/*
 * Fetch account infomation
 *
 * @return array
 */
async function syncAccounts() {
    const data = [];

    for (const account of accounts) {
        const r = await getAccount(account.wallet);
        data.push({
            ...r,
            ...account,
        });
        await delay(500);
    }

    return data;
}

async function fetchBalanceOf(wallet, type) {
    const account = await getAccount(wallet);
    return parseBalance(
        account.balances.find((r) => r.toUpperCase().endsWith(type))
    );
}

function parseBalance(value) {
    return Number(value.split(" ")[0]);
}

/*
 * logic withdraw, repair, recover
 *
 * @param tools Array[]
 * @param paybw object | null
 *
 * @return void
 */
async function anotherTask(tools, paybw = null) {
    try {
        // TASK: repair
        for (const tool of tools) {
            const gold = await fetchBalanceOf(tool.wallet, "GOLD");
            const consumed = (tool.durability - tool.currentDurability) / 5;
            console.log("Repair", tool.assetId, "gold consumed", consumed);
            if (gold >= consumed) await repair(tool, paybw);
            else console.log("Not enough gold to repair.");
            await delay(500);
        }

        const canWithdraw = await isWithdrawFeeEqual(MINIMUM_FEE);
        const fwAccounts = await syncAccounts();


        for (const account of fwAccounts) {
            if (account.energy <= RECOVER_IF_ENERGY_LOWER) {
                let energy = account.max_energy - account.energy;
                let consumed = energy / 5;
                const food = parseBalance(
                    account.balances.find((r) =>
                        r.toUpperCase().endsWith("FOOD")
                    )
                );

                if (account.energy <= LOWEST_ENERGY && food < consumed) {
                    consumed = Math.floor(food);
                    energy = consumed * 5;
                }

                if (food >= consumed) {
                    console.log("Recover", account.wallet, energy, "energy");
                    await recover(account, energy, paybw);
                } else {
                    console.log("Not enough food to recover.");
                    continue;
                }
            }

            if (canWithdraw) {
                const quantities = account.balances.filter((r) => {
                    const amount = parseBalance(r);
                    const symbol = r.split(" ")[1];
                    return amount > MINIMUN_WITHDRAW && WITHDRAWABLE.includes(symbol);
                });

                if (quantities.length > 0) {
                    console.log("Withdrawing...");
                    await withdraw(account, quantities, MINIMUM_FEE, paybw);
                }
            }
        }
    } catch (e) {
        console.log("[ERROR] another task error -", e.message);
    }
}

async function main(paybw) {
    let difftime = 22
    for (const account of accounts) {
        await getTokenGET(account.wallet);
        await delay(2000);
        await getTokenGala(account.wallet);
        await delay(1000);
        console.log("Login with wallet ", account.wallet);
        await login(account, paybw);
        await delay(3000);
        console.log("Mine with wallet ", account.wallet);

        try {
            await mine(account, paybw);
        } catch (e) {
            // an error occus
            console.log("[Error] -", e);
            if((e.message).includes("seconds to mine again")){
                var regex = /\d+/g;
                difftime = (e.message).match(regex);
                // difftime = 20;
            }
        }
        await delay(1000);
    }
    
    if (difftime > 0) {
        console.log(
            "Next claim after " + difftime  + " seconds"
        );

        await countdown(difftime);
        await delay(difftime * 1000);
    }
}

export default async function () {
    let paybw = null;
    if (PAYBW) {
        paybw = require("./paybw.json");
    }

    console.log("working...");
    // await main(paybw);
    while (true) {
        try {
            await main(paybw);
        } catch (e) {
            // an error occus
            console.log("[Error] -", e);
        }
    }
}
