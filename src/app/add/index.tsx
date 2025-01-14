import { useState } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

import { Categories } from "@/components/categories"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { LinkStorage } from "@/storage/link-storage"

export default function Add() {
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")

    async function handleAdd(){ //handle = funções disparadas a partir da interação com o usuário
        try{
            if(!category) { 
            //se a categoria não foi seleionada, retorna um alerta
                return Alert.alert("Categoria", " Selecione a categoria") //sai da função
            }
    
            if(!name.trim()) { //.trim() remove espaços
                return Alert.alert("Nome", "Informe o nome")
            }
    
            if(!url.trim()) { //.trim() remove espaços
                return Alert.alert("URL", "Informe a URL")
            }

            await LinkStorage.save({
                id: new Date().getTime().toString(),
                //gera uma sequencia numerica da data e hora
                name,
                url,
                category
            })

        
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o link")
            console.log(error)
        }
        
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]}/>
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>

            <Text style={styles.label}>Selecione uma categoria</Text>
            <Categories onChange={setCategory} selected={category}/>

            <View style={styles.form}>
                <Input placeholder="Nome" onChangeText={setName} autoCorrect={false}/>
                <Input 
                placeholder="URL"  
                onChangeText={setUrl} 
                autoCorrect={false}
                autoCapitalize="none" //letra maiuscula desativada
                />
                <Button title="Adicionar" onPress={handleAdd}/>
            </View>
            
        </View>
    )
}