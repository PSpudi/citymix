let counted = [];

function calculate() {
    let seedSelectedName = document.querySelector('#seed-select').value,
        seedQty = document.querySelector('#seed-qty').value,
        seedsTable = document.querySelector('#seeds-calc-table');

    //remove tables to do not have duplicated values if they exists
    if (document.querySelector('#seeds-calc-table tbody')) {
        document.querySelector('#seeds-calc-table tbody').remove();
        document.querySelector('#seeds-calc-sum tbody').remove();
    }

    counted = [];

    let mainSeedClass = calculateFor(seedSelectedName, seedQty);

    renderTable(mainSeedClass, seedsTable);
}

function calculateFor(seedSelectedName, seedQty) {
    let mainSeedClass = getMainSeedClassByName(seedSelectedName);

    mainSeedClass.increaseMainQty(seedQty);

    if (mainSeedClass.needs.hasOwnProperty('complicated')) {
        // increase qty for more complicated seeds
        this.increaseAllQty(mainSeedClass, seedQty);
    } else {
        if (mainSeedClass.needs.hasOwnProperty('base')) {
            // increase qty for base seeds
            mainSeedClass.needs['base'].forEach(function (baseSeed) {
                baseSeed.increaseMainQty(seedQty);
            });
        }
    }

    return mainSeedClass;
}

function increaseAllQty(seed, moreQty) {
    let self = this;
    if (seed.needs.length === 0) {
        //all qty increased
        return this;
    }

    seed.needs['base'].forEach(function (baseSeed) {
        baseSeed.qty = parseInt(baseSeed.qty) + parseInt(moreQty);
    });

    if (seed.needs.hasOwnProperty('complicated')) {
        seed.needs['complicated'].forEach(function (seedClass) {
            seedClass.increaseMainQty(moreQty);
            this.increaseAllQty(seedClass, moreQty);
        });
    }

    return this;
}

function renderTable(mainSeedClass, seedsTable) {
    let seedsTbody = seedsTable.createTBody();

    //first render base seeds
    mainSeedClass.needs['base'].forEach(function (baseSeed) {
        let baseRowId = baseSeed.name + '-base',
            rowClass = 'base';
        this.renderRow(baseSeed, baseRowId, seedsTbody, rowClass);

        counted.push({label: baseSeed.label, qty: baseSeed.qty});
    });

    //then render complicated seeds
    if (mainSeedClass.needs.hasOwnProperty('complicated')) {
        mainSeedClass.needs['complicated'].forEach(function (seedClass) {
            let complicatedRowId = seedClass.name + '-complicated-parent',
                rowClass = 'complicated-parent';
            this.renderRow(seedClass, complicatedRowId, seedsTbody, rowClass);
            this.renderChildrenRows(seedClass, seedsTbody, 1);
        });
    }

    //then render sum of base seeds only
    let sumTable = document.querySelector('#seeds-calc-sum'),
        sumTbody = sumTable.createTBody();

    counted.forEach(function (baseSeedCounted) {
        let seedRowId = baseSeedCounted.name + '-base-sum';
        this.renderRow(baseSeedCounted, seedRowId, sumTbody, 'base-sum');
    });

    seedsTable.removeAttribute('hidden');
    sumTable.parentElement.removeAttribute('hidden');
}

function renderRow(seedClass, seedRowId, parentRow, rowClass) {
    let seedRow = parentRow.insertRow(),
        seedNameCell = seedRow.insertCell(),
        seedQtyCell = seedRow.insertCell();

    seedRow.id = seedRowId;
    seedRow.className = rowClass;

    seedNameCell.id = 'name';
    seedNameCell.innerHTML = seedClass.label;

    seedQtyCell.id = 'qty';
    seedQtyCell.innerHTML = seedClass.qty;
}

function renderChildrenRows(seedClass, parentRow, childDepth) {
    if (seedClass.needs.hasOwnProperty('base')) {
        seedClass.needs['base'].forEach(function (seed) {
            let rowId = seed.name + '-complicated-base',
                rowClass = 'complicated-base-' + childDepth;
            this.renderRow(seed, rowId, parentRow, rowClass)

            let seedIndex = counted.findIndex((seedCounted) => seedCounted.label === seed.label);
            if (seedIndex > -1) {
                counted[seedIndex].qty = parseInt(counted[seedIndex].qty) + seed.qty;
            } else {
                counted.push({label: seed.label, qty: seed.qty});
            }
        });
    }

    if (seedClass.needs.hasOwnProperty('complicated')) {
        seedClass.needs['complicated'].forEach(function (seed) {
            let seedRowId = seed.name + '-complicated-child';
            this.renderRow(seed, seedRowId, parentRow, 'complicated-child-' + childDepth)
            //render complicated row if it has more needs in it
            this.renderChildrenRows(seed, parentRow, childDepth+1);
        });
    }
}