import { Text, Pressable, PressableProps } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

type Props = PressableProps & { // Props = tudo que um PressableProps tem E as propriedades
    name: string
    icon: keyof typeof MaterialIcons.glyphMap // extrair a tipagem baseado nas chaves que estão disponíveis na biblioteca (mostra todos os ícones que estão disponéveis)
    isSelected: boolean
}

export function Category({name, icon, isSelected, ...rest} : Props) {

    const color = isSelected ? colors.green[300] : colors.gray[400] //se ta selecionada ou não

    //...rest pega todo o restante das propriedades que estão sendo passadas
    return (
        <Pressable style={styles.container} {...rest}> 
            <MaterialIcons name={icon} size={16} color={color} />
            <Text style={[styles.name, { color }]}>{name}</Text> 
            {/* se quiser mais de um estilo usa entre [] */}
        </Pressable>
    )
}