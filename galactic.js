import transact from "./transact.js";
import query from "./service/wax-query.js";
import { toCamelCase } from "./utils.js";

/*
 * make a login
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function login(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "login",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    //ind: '0',
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * make a mine
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function mine(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "mine",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    ind: '0',
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * remove a pilot
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function removepilot(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "removeinslot",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    ind: '0',
                    type: 'pilot',
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * restore a pilot
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function restorepilot(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "restore",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    assetid: inputData.assetId,
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * insert a pilot
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function insertpilot(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "inserttoslot",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    assetid: inputData.assetId,
                    ind: '0',
                    type: 'pilot',
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * remove a ship
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function removeship(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "removeinslot",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    ind: '0',
                    type: 'ship',
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * Recharge: SHIP is out of TANK, need ATOMIC ENERGY to recharge
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 * Ship hết TANK, Tháo Ship và nạp ATOMIC ENERGY
 * removeinslot ship (Nếu lỗi sẽ báo assertion failure with message: Already empty)
 * recharge tốn ATOMIC ENERGY
 * inserttoslot ship
 * mine
 */
export function rechargeship(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "recharge",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    assetid: inputData.assetId,
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * Repair: SHIP is out of DURABILITY, need BLOODY ORE to repair
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function repairship(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "repair",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    assetid: inputData.assetId,
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * insert a ship
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function insertship(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "galacticgame",
                name: "inserttoslot",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    assetid: inputData.assetId,
                    ind: '0',
                    type: 'ship',
                    nm: inputData.wallet
                },
            },
        ],
        paybw
    );
}

/*
 * withdraw
 *
 * @param inputData object {"wallet": "", "privateKey": ""}
 * @param quantities array example ["101.9150 FOOD"]
 * @param fee number example 8
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function rutBO(inputData, quantities, fee, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "withdraw",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    owner: inputData.wallet,
                    quantities: quantities,
                    fee: fee,
                },
            },
        ],
        paybw
    );
}
export function rutSR(inputData, quantities, fee, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "withdraw",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    owner: inputData.wallet,
                    quantities: quantities,
                    fee: fee,
                },
            },
        ],
        paybw
    );
}




/*
 * repair a tool
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function repair(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "repair",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    asset_owner: inputData.wallet,
                    asset_id: inputData.assetId,
                },
            },
        ],
        paybw
    );
}

/*
 * recover energy
 *
 * @param inputData object {"wallet": "", "privateKey": ""}
 * @param energy number example 140
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function recover(inputData, energy, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "recover",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    owner: inputData.wallet,
                    energy_recovered: energy,
                },
            },
        ],
        paybw
    );
}

/*
 * withdraw
 *
 * @param inputData object {"wallet": "", "privateKey": ""}
 * @param quantities array example ["101.9150 FOOD"]
 * @param fee number example 8
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function withdraw(inputData, quantities, fee, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "withdraw",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    owner: inputData.wallet,
                    quantities: quantities,
                    fee: fee,
                },
            },
        ],
        paybw
    );
}

/*
 * watering
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function cropclaim(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "cropclaim",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    owner: inputData.wallet,
                    crop_id: inputData.assetId,
                },
            },
        ],
        paybw
    );
}

/*
 * animal claim
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function anmclaim(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "anmclaim",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    owner: inputData.wallet,
                    animal_id: inputData.assetId,
                },
            },
        ],
        paybw
    );
}

/*
 * bulding
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function bldclaim(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "bldclaim",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    owner: inputData.wallet,
                    asset_id: inputData.assetId,
                },
            },
        ],
        paybw
    );
}

/*
 * stake
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function stake(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "atomicassets",
                name: "transfer",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    from: inputData.wallet,
                    to: "farmersworld",
                    asset_ids: [inputData.assetId],
                    memo: "stake"
                },
            },
        ],
        paybw
    );
}

/*
 * unstake
 *
 * @param inputData object {"wallet": "", "privateKey": "", "assetId": ""}
 * @param paybw object {"wallet": "", "privateKey": ""} | null
 * @return Promise
 */
export function unstake(inputData, paybw = null) {
    return transact(
        inputData.privateKey,
        [
            {
                account: "farmersworld",
                name: "unstake",
                authorization: [
                    {
                        actor: inputData.wallet,
                        permission: "active",
                    },
                ],
                data: {
                    asset_owner: inputData.wallet,
                    asset_id: inputData.assetId,
                },
            },
        ],
        paybw
    );
}

/*
* fetch data from contract
* 
* @param table string
* @param filter string
* @paran indexPosition int
* 
* @return Promise
*/
export function queryData(table, filter = null, indexPosition = 2) {
    return query({
        json: true,
        code: "galacticgame",
        scope: "galacticgame",
        table: table,
        lower_bound: filter,
        upper_bound: filter,
        index_position: indexPosition,
        key_type: "i64",
        limit: "100",
        reverse: false,
        show_payer: false,
    });
}

/*
* fetch data from contract
* 
* @param accounts array
* @param table string
* 
* @return Promise(Array)
*/
export async function tables(table, accounts) {
    let rows = [];
    for (const account of accounts) {
        console.log("Fetch", table, "wallet ", account.wallet);
        const data = await queryData(table, account.wallet);
        rows = rows.concat(
            data
                ? data.rows.map((r) => ({ ...toCamelCase(r), ...account }))
                : []
        );
    }

    return rows;
}
