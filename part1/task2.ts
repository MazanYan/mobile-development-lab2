enum Suit {
    spades, hearts, diamonds, clubs
}

enum Rank {
    two = 2, three, four,
    five, six, seven,
    eight, nine, ten,
    jack, queen, king,
    ace
}

class Card {

    description = "🂠";

    constructor(public rank: Rank, public suit: Suit) {

    }

    static compare(lvh: Card, rvh: Card): boolean {
        return lvh.rank < rvh.rank && lvh.suit === rvh.suit;
    }

}

