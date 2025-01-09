import { Image, View, TouchableOpacity, FlatList, Modal, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

import { Categories } from "@/components/categories"
import { Link } from "@/components/link"
import { Option } from "@/components/option"

export default function Index() {

    return(
        <View style={styles.container}>
           <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo}/>

            <TouchableOpacity activeOpacity={0.5}>
                <MaterialIcons name="add" size={32} color={colors.green[300]} />
            </TouchableOpacity>
           </View>

          
            <Categories />

            

            <FlatList
                data={["1", "2", "3"]}
                keyExtractor={(item) => item}
                renderItem={() => (
                    <Link 
                        name="Rocketseat" 
                        url="https://app.rocketseat.com.br/"
                        onDetails={() => console.log("clicou!")}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent visible>
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

