import { Text, Pressable, PressableProps } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

type Props = PressableProps & { // Props = tudo que um PressableProps tem E as propriedades
    name: string
    icon: keyof typeof MaterialIcons.glyphMap // extrair a tipagem baseado nas chaves que estão disponíveis na biblioteca (mostra todos os ícones que estão disponéveis)
}

export function Category({name, icon, ...rest} : Props) {
    //...rest pega todo o restante das propriedades que estão sendo passadas
    return (
        <Pressable style={styles.container} {...rest}> 
            <MaterialIcons name={icon} size={16} color={colors.gray[400]} />
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    )
}