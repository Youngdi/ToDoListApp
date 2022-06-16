import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../text/text"
import { translate } from "../../i18n"
import { useStores } from "../../models"

const CONTAINER: ViewStyle = {
  height: 50,
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  padding: 10,
  backgroundColor: color.palette.white,
  borderRadius: 10,
  marginTop: 10,
}
const ITEM_DOT: ViewStyle = {
  marginLeft: 10,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: color.palette.navyBlue,
}

const LIST_TEXT: TextStyle = {
  marginLeft: 10,
  color: color.palette.black,
}

const LIST_LEFT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export interface ListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  deleteHandler?: () => void
  onPress?: () => void
  content: string
  id: string | number
  done: boolean
}

export const ListItem = (props: ListProps) => {
  const { content, deleteHandler, onPress } = props
  const { taskStore } = useStores()

  return (
    <TouchableOpacity
      style={CONTAINER}
      onPress={onPress}
    >
      <View style={LIST_LEFT}>
        <View style={ITEM_DOT} />
        <Text style={LIST_TEXT}>{content}</Text>
      </View>
      <TouchableOpacity onPress={deleteHandler}>
        <Text style={LIST_TEXT}>{translate("common.remove")}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
