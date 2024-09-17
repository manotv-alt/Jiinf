export class Fetch {
    constructor (baseURL) {
        this.BASEURL = baseURL;
    }
    async GetEventos() {
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

    async GetTimes() {
        try {
            const response = fetch(this.BASEURL + "/api/v1/times/", {
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

    async GetTotalPoints(id) {
        try {
            const response = fetch(this.BASEURL + "/api/v1/times/total/" + id + "/" , {
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


    async GetTimeMedals(id) {
        try {
            const response = fetch(this.BASEURL + "/api/v1/times/" + id + "/" , {
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

    async GetTime(id) {
        try {
            const response = fetch(this.BASEURL + "/api/v1/time/" + id + "/" , {
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

    async GetModalidades() {
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

    async GetEquipes() {
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