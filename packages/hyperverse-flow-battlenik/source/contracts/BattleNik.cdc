pub contract BattleNik {

    // If your guess is the same as Nik's, you lose.
    // If it's different, you win.
    pub fun battle(yourGuess: Int): Bool {
        pre {
            yourGuess == 0 || yourGuess == 1:
                "You must guess 0 or 1"
        }
        let nikGuess: Int = Int(getCurrentBlock().height)
        return nikGuess != yourGuess
    }

}