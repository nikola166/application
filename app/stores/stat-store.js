import { values } from "mobx"
import { types, flow } from "mobx-state-tree"
import axios from 'axios'

export const Stat = types.model("Stat", {
    id: types.identifier(types.number),
    name: types.string,
    last: types.string,
    highestBid: types.string,
    percentChange: types.string
})

export const StatStore = types.model("StatStore", {
    isLoading: false,
    error: false,
    isLoaded: false,
    stats: types.array(Stat)
})
.views(self => ({
    get sortedAvailableStats() {
        return sortStat(values(self.stats))
    }
}))
.actions(self => {
    function markLoading(loading) {
        self.isLoading = loading
    }

    function markLoaded(loaded) {
        self.isLoaded = loaded
    }

    function markError(error) {
        self.error = error
    }

    function updateStats(json) {
        for (var k in json){
            const element = {
                id:  parseFloat(json[k]['id']),
                name: k,
                last: json[k]['last'],
                highestBid: json[k]['highestBid'],
                percentChange: json[k]['percentChange']
            };

            if (json.hasOwnProperty(k)) {
                if (self.stats.find((item, index, array) => {
                    if (item.id != element.id) {
                        return false;
                    } else {
                        return true
                    }
                })) {
                    self.stats.map((item) => {
                        if (item.name == element.name &&
                            (item.last != element.last ||
                            item.highestBid != element.highestBid ||
                            item.percentChange != element.percentChange)) {
                            self.stats.remove(item)
                            self.stats.push(element)
                        }
                    })
                    if (self.stats.find((item, index, array) => {
                            if (item != element) {
                                return false;
                            } else {
                                return true
                            }
                    })) {

                    }
                } else {
                    self.stats.push({
                        id:  parseFloat(json[k]['id']),
                        name: k,
                        last: json[k]['last'],
                        highestBid: json[k]['highestBid'],
                        percentChange: json[k]['percentChange']
                    })
                }
            }
        }
    }

    const updateLoadStats = flow(function* loadBooks() {
        try {
            const json = yield axios({
                method: 'get',
                url: "https://poloniex.com/public?command=returnTicker",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            updateStats(json.data)
        } catch (err) {
            console.log(err);
            markError(true)
        }
    })

    const loadStats = flow(function* loadBooks() {
        markLoading(true)
        try {
            const json = yield axios({
                method: 'get',
                url: "https://poloniex.com/public?command=returnTicker",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            updateStats(json.data)
            markLoading(false)
            markLoaded(true)
        } catch (err) {
            console.log(err);
            markError(true)
        }
    })

    return {
        loadStats,
        updateLoadStats
    }
}).create({
    stats: []
})

function sortStat(stats) {
    return stats
        .sort((a, b) => (a.id > b.id ? 1 : -1))
}