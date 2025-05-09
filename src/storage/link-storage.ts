import AsyncStorage from "@react-native-async-storage/async-storage"

const LINKS_STORAGE_KEY = "links-storage" //nome da chave

export type LinkStorage = {
    id: string
    name: string
    url: string
    category: string
}

async function get(): Promise<LinkStorage[]> { //não armazena/recupera os dados no exato momento
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY) //recupera o conteudo
    const response = storage ? JSON.parse(storage) : [] //tem conteudo? entao converte para objeto, se não retorna []

    return response

} 

async function save(newLink: LinkStorage) {
    try {
        const storage = await get()
        const updated = JSON.stringify([...storage, newLink]) //traz tudo que ta guardado no armazenamento + o novo link
        //tranforma em texto para oassar no setItem
        
        await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated) //Definir um novo item
    } catch(error) { //não depende só da aplicação
        throw error
    }
}

async function remove(id: string) {
    try {
        const storage = await get()

        const updated = storage.filter((link) => link.id !== id)
        //armazena todos os links, menos o id do link que to selecionando, atualizando o storage tirando o link que nao quero mais

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
        throw error
    }
}

export const LinkStorage = { get, save, remove }