export class Fetch {
    constructor (baseURL) {
        this.BASEURL = baseURL;
    }
    async GetCalendar() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/jiinf/eventos/", {
                method: "GET",
            })

            if(!response) {
                const errorResponse = await response.json(); 
                throw new Error(errorResponse.error || "Erro desconhecido");
            }

            return (await response).json()
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async GetModalities() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/jiinf/modalidades/" , {
                method: "GET",
            })

            if(!response) {
                const errorResponse = await response.json(); 
                throw new Error(errorResponse.error || "Erro desconhecido");
            }

            return (await response).json()
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async GetTeams() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/jiinf/equipes/" , {
                method: "GET",
            })

            if(!response) {
                const errorResponse = await response.json(); 
                throw new Error(errorResponse.error || "Erro desconhecido");
            }

            return (await response).json()
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    
    async GetResults() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/jiinf/resultado/" , {
                method: "GET",
            })

            if(!response) {
                const errorResponse = await response.json(); 
                throw new Error(errorResponse.error || "Erro desconhecido");
            }

            return (await response).json()
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async GetHome() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/jiinf/hub/" , {
                method: "GET",
            })

            if(!response) {
                const errorResponse = await response.json(); 
                throw new Error(errorResponse.error || "Erro desconhecido");
            }

            return (await response).json()
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async GetAllPoints() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/jiinf/simulation/resultado/" , {
                method: "GET",
            })

            if(!response) {
                const errorResponse = await response.json(); 
                throw new Error(errorResponse.error || "Erro desconhecido");
            }

            return (await response).json()
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async GetSimulationModalities() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/jiinf/simulation/modalidades/" , {
                method: "GET",
            })

            if(!response) {
                const errorResponse = await response.json(); 
                throw new Error(errorResponse.error || "Erro desconhecido");
            }

            return (await response).json()
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}