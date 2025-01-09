import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

type Props = TouchableOpacityProps & {
    name: string
    icon: keyof typeof MaterialIcons.glyphMap
    variant?: "primary" | "secondary" //opcional e OU
}

export function Option({ name, icon, variant = "primary", ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <MaterialIcons
                name={icon}
                size={20}
                color={variant === "primary" ? colors.green[300] : colors.gray[400]} // com base no selecionado
            />

            <Text
                style={
                    variant === "primary" ? styles.primaryTitle : styles.secondaryTitle // com base no selecionado
                }
            >
                {name}
    
            </Text>
        </TouchableOpacity>
    )
}