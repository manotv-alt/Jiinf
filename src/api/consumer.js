export class Fetch {
    constructor (baseURL) {
        this.BASEURL = baseURL;
    }
    async GetCalendar() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/eventos/", {
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
            const response = fetch(this.BASEURL + "/api/v1/modalidades/" , {
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
            const response = fetch(this.BASEURL + "/api/v1/equipes/" , {
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
            const response = fetch(this.BASEURL + "/api/v1/resultado/" , {
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
            const response = fetch(this.BASEURL + "/api/v1/hub/" , {
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