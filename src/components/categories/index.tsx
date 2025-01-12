import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

type Props = {
    selected: string
    onChange: (category: string) => void
}

export function Categories({ selected, onChange }: Props) {
    return (
        <FlatList 
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Category 
                name={item.name} 
                icon={item.icon} 
                isSelected={item.name === selected} //comparar se o nome da categoria é igual a categoria selecionada no momento 
                onPress={() => onChange(item.name)} //função que pega categoria clicada
                />
            )}  

            horizontal //alinhar na horizontal 
            style={styles.container} //define o contêiner externo, por exemplo, sua altura e relações com elementos irmãos
            contentContainerStyle={styles.content} //define o contêiner interno dele, por exemplo, align-items, padding
            showsHorizontalScrollIndicator={false}
        />
    )
    
}