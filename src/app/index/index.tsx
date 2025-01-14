import { useState, useCallback } from "react"

import { Image, View, TouchableOpacity, FlatList, Modal, Text, Alert, Linking } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"

import { colors } from "@/styles/colors"
import { styles } from "./styles"
import { categories } from "@/utils/categories"
import { LinkStorage } from "@/storage/link-storage"

import { Categories } from "@/components/categories"
import { Link } from "@/components/link"
import { Option } from "@/components/option"


export default function Index() {
    const [showModal, setShowModal] = useState(false)
    const [link, setLink] = useState<LinkStorage>({} as LinkStorage) //individual
    const [category, setCategory] = useState(categories[0].name)
    const [links, setLinks] = useState<LinkStorage[]>([])

    async function getLinks() {
        try {
            const response = await LinkStorage.get()

            const filtered = response.filter((link) => link.category === category) //verifica se a categoria é igual a selecionada

            setLinks(filtered)

        } catch (error){
            Alert.alert("Erro", "Não foi possível listar os links")
        }
    }

    function handleDetails(selected: LinkStorage) {
        setShowModal(true)
        setLink(selected)
    } //para mostrar as informações do link selecionado

    async function linkRemove () {
        try {
           await LinkStorage.remove(link.id)
           getLinks()
           setShowModal(false)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir")
            console.log(error)
        }
    }

    function handleRemove() {
        Alert.alert("Excluir", "Deseja realmente excluir?", [
            { style: "cancel", text: "Não" },
            { text : "Sim", onPress: linkRemove }
        ])

    }

    async function hadleOpen() {
        try {
            const formattedUrl = link.url.startsWith('http://') || link.url.startsWith('https://')
            ? link.url
            : `https://${link.url}`; 
        
        await Linking.openURL(formattedUrl); // Abre o link
        } catch (error) {
            Alert.alert("Link", "Não foi possível abrir o link")
            console.log(error)
        }
    }

    useFocusEffect( //toda que a tela receber o foco, ela vai chamar a lista
        useCallback(() => { //memoriza o uso dessa função para que ela não seja executada de forma desnecessária
            getLinks()
        }, [category])
    )   //toda vez que mudar a categoria, ele muda

    return(
        <View style={styles.container}>
           <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo}/>

            <TouchableOpacity onPress={() => router.navigate("/add")}>
                <MaterialIcons name="add" size={32} color={colors.green[300]} />
            </TouchableOpacity>
           </View>

          
            <Categories 
            onChange={setCategory}
            selected={category}
            />

            

            <FlatList
                data={links}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Link 
                        name={item.name} 
                        url={item.url}
                        onDetails={() => handleDetails(item)}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent visible={showModal} animationType="slide">
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>{link.category}</Text>

                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <MaterialIcons 
                                name="close" 
                                size={20} 
                                color={colors.gray[400]} 
                                />   
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalLinkName}>{link.name}</Text>
                        <Text style={styles.modalUrl}>{link.url}</Text>

                        <View style={styles.modalFooter}>
                            <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove}/>
                            <Option name="Abrir" icon="language" onPress={hadleOpen} /> 
                            {/* Componentes */}

                        </View>

                    </View>

                    


                </View>


            </Modal>
        </View>
    ) 
    
}

