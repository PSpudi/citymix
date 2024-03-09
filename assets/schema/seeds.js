class Seed {
    name = '';
    label = '';
    qty = 0;
    needs = [];

    increaseMainQty(moreQty) {
        this.qty = parseInt(this.qty) + parseInt(moreQty);
        return this;
    }
}

/**
 * BASE
 */
class BaseHaze extends Seed {
    name = 'haze';
    label = 'Haze';
    qty = 0;
}

class BaseAfganKush extends Seed {
    name = 'afgan-kush';
    label = 'Afgan Kush';
    qty = 0;
}

class BaseLemonG extends Seed {
    name = 'lemong';
    label = 'LemonG';
    qty = 0;
}

class BaseZkittlez extends Seed {
    name = 'zkittlez';
    label = 'Zkittlez';
    qty = 0;
}

/**
 * COMPLICATED
 */
class TrainHaze extends Seed {
    name = 'train-haze';
    label = 'Train Haze';
    qty = 0;
    needs = {
        'base': [
            new BaseLemonG(),
            new BaseZkittlez()
        ]
    }
}
class PurpleHaze extends Seed {
    name = 'purple-haze';
    label = 'Purple Haze';
    qty = 0;
    needs = {
        'base': [
            new BaseHaze(),
            new BaseAfganKush()
        ]
    }
}

class Blueberry extends Seed {
    name = 'blueberry';
    label = 'Blueberry';
    qty = 0;
    needs = {
        'base': [
            new BaseAfganKush()
        ],
        'complicated': [
            new PurpleHaze()
        ]
    };
}

class G13 extends Seed {
    name = 'g13';
    label = 'G13';
    qty = 0;
    needs = {
        'base': [
            new BaseLemonG()
        ],
        'complicated': [
            new TrainHaze()
        ]
    };
}

class DaddyPurple extends Seed {
    name = 'daddy-purple';
    label = 'Daddy Purple';
    qty = 0;
    needs = {
        'base': [
            new BaseHaze()
        ],
        'complicated': [
            new G13()
        ]
    };
}

class CharlottsWeb extends Seed {
    name = 'charlotts-web';
    label = 'Charlott\'s Web';
    qty = 0;
    needs = {
        'base': [
            new BaseZkittlez()
        ],
        'complicated': [
            new Blueberry()
        ]
    };
}

class StrawberryCough extends Seed {
    name = 'strawberry-cough';
    label = 'Strawberry Cough';
    qty = 0;
    needs = {
        'base': [],
        'complicated': [
            new DaddyPurple(),
            new CharlottsWeb()
        ]
    };
}

function getMainSeedClassByName(seedName) {
    switch (seedName) {
        case 'train-haze':
            return new TrainHaze();
        case 'purple-haze':
            return new PurpleHaze();
        case 'blueberry':
            return new Blueberry();
        case 'g13':
            return new G13();
        case 'daddy-purple':
            return new DaddyPurple();
        case 'charlotts-web':
            return new CharlottsWeb();
        case 'strawberry-cough':
            return new StrawberryCough();
        default:
            return [];
    }
}
