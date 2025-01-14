import { useState, useCallback } from "react"

import { Image, View, TouchableOpacity, FlatList, Modal, Text, Alert } from "react-native"
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
    const [category, setCategory] = useState(categories[0].name)
    const [links, setLinks] = useState<LinkStorage[]>([])

    async function getLinks() {
        try {
            const response = await LinkStorage.get()
            setLinks(response)
        } catch (error){
            Alert.alert("Erro", "Não foi possível listar os links")
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
                        onDetails={() => console.log("clicou!")}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent visible={false}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>Curso</Text>

                            <TouchableOpacity>
                                <MaterialIcons 
                                name="close" 
                                size={20} 
                                color={colors.gray[400]} 
                                />   
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalLinkName}>Rocketseat</Text>
                        <Text style={styles.modalUrl}>https://app.rocketseat.com.br/</Text>

                        <View style={styles.modalFooter}>
                            <Option name="Excluir" icon="delete" variant="secondary" />
                            <Option name="Abrir" icon="language" /> 
                            {/* Componentes */}

                        </View>

                    </View>

                    


                </View>


            </Modal>
        </View>
    ) 
    
}

