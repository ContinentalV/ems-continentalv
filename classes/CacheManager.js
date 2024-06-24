class CacheManager {
    private playerCount = 0;

    getPlayersCount() {
        return this.playerCount;
    }

    updatePlayersCount(count) {
        this.playerCount = count;
    }
}

export default CacheManager;