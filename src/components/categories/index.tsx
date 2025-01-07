import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

export function Categories() {
    return (
        <FlatList 
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Category name={item.name} icon={item.icon} isSelected={false}/>
            )}  

            horizontal //alinhar na horizontal 
            style={styles.container} //define o contêiner externo, por exemplo, sua altura e relações com elementos irmãos
            contentContainerStyle={styles.content} //define o contêiner interno dele, por exemplo, align-items, padding
            showsHorizontalScrollIndicator={false}
        />
    )
    
}