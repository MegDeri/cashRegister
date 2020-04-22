const REGISTER_STATUS = {
    closed: 'CLOSED',
    insufficient: 'INSUFFICIENT_FUNDS',
    open: 'OPEN'
}

function checkCashRegister(price, cash, cid) {
    let output = { status: "", change: [] };
    const changeNeeded = parseFloat(cash - price).toFixed(2);
    const changeAvailable = getTotalCashRegister(cid);
    output.status = getTotalStatus(changeNeeded, changeAvailable)


    if (output.status === REGISTER_STATUS.insufficient) {
        return output.change = [];
    }

    output.change = getCustomerChange(changeNeeded, cid)

    console.log(output)

    function getCustomerChange(changeNeeded, changeInDrawer) {
        let change = [];
        const currency = {
            "PENNY": 0.01,
            "NICKEL": 0.05,
            "DIME": 0.10,
            "QUARTER": 0.25,
            "ONE": 1.00,
            "FIVE": 5.00,
            "TEN": 10.00,
            "TWENTY": 20.00,
            "ONE HUNDRED": 100.00
        };
        for (let i = changeInDrawer.length - 1; i >= 0; i--) {
            const coinName = changeInDrawer[i][0];
            const coinTotal = changeInDrawer[i][1];
            const coinValue = currency[coinName];
            let coinAmount = (coinTotal / coinValue).toFixed(2);
            let coinToReturn = 0;

            while (changeNeeded >= coinValue && coinAmount > 0) {
                changeNeeded -= coinValue;
                changeNeeded = changeNeeded.toFixed(2);
                coinAmount--;
                coinToReturn++;
            }
            if (coinToReturn > 0) {
                change.push([coinName, coinToReturn * coinValue]);
            }
        }
        return change
    }

    function getTotalStatus(changeNeeded, changeAvailable) {
        if (Number(changeNeeded) > Number(changeAvailable)) {
            return REGISTER_STATUS.insufficient
        } else if (Number(changeNeeded) === Number(changeAvailable)) {
            return REGISTER_STATUS.closed
        } else {
            return REGISTER_STATUS.open
        }
    }

    function getTotalCashRegister(changeInDrawer) {
        let total = 0;

        for (let change of changeInDrawer) {
            let changeValue = change[1];
            total += changeValue;
        }
        return total.toFixed(2)
    }





    return output;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);