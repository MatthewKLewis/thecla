class SciFiRandom {
    vowels = "aeiouy".split('');
    consonants = "bcdfghjklmnpqrstvwxz".split('');
    syllables = [];

    constructor() {
        for (let i = 0; i < this.consonants.length; i++) {
            for (let j = 0; j < this.vowels.length; j++) {
                this.syllables.push(this.consonants[i] + this.vowels[j]);
            }
        }
    }

    getSciFiName(syllables) {
        var retStr = ''
        for (let i = 0; i < syllables; i++) {
            retStr += this.syllables[Math.floor(Math.random() * this.syllables.length)]
        }
        retStr = retStr.charAt(0).toUpperCase() + retStr.slice(1);
        return retStr;
    }
}

module.exports = SciFiRandom;