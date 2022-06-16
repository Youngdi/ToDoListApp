import React, { FC, useEffect, useRef, useState, useCallback } from "react"
import * as LocalAuthentication from "expo-local-authentication"
import { observer } from "mobx-react-lite"
import { TextInput, Button } from "react-native-paper"
import {
  FlatList,
  TextStyle,
  View,
  ViewStyle,
  TextInput as NativeTextInput,
  KeyboardAvoidingView,
  Text,
  Platform,
} from "react-native"
import { useStores } from "../../models"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Screen, Header, ListItem } from "../../components"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { translate } from "../../i18n/"

const FULL: ViewStyle = {
  flex: 1,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  height: "230%",
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const EMPTY_TITLE: TextStyle = {
  fontSize: 30,
  color: color.palette.white,
  fontWeight: "bold",
  textAlign: "center",
}
const TEXT_INPUT_CONTAINER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: color.palette.white,
  borderRadius: 10,
  marginLeft: 15,
  marginRight: 15,
  marginBottom: 15,
  paddingLeft: 10,
  paddingRight: 10,
  borderColor: color.palette.black,
  borderWidth: 1,
}
const EMPTY_CONTAINER: ViewStyle = {
  marginTop: 10,
}

export const TaskScreen: FC<StackScreenProps<NavigatorParamList, "task">> = observer(
  function TaskScreen() {
    const navigation = useNavigation()
    const inputRef = useRef<NativeTextInput>()
    const [text, setText] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [currentTaskId, setCurrentTaskId] = useState(null)
    const goBack = () => navigation.goBack()
    const { taskStore } = useStores()
    const { taskList } = taskStore

    useEffect(() => {
      async function fetchData() {
        await taskStore.getTasks()
      }
      fetchData()
    }, [])

    const handleTextChange = useCallback((newValue) => {
      setText(newValue)
    }, [])

    const deleteHandler = (id: string | number) => () => taskStore.deleteTask(id)

    const onPressTaskItem = (id: string | number) => () => {
      const task = taskStore.getTaskById(id)
      setText(task.content)
      setIsUpdate(true)
      setCurrentTaskId(id)
      inputRef.current.focus()
    }

    const handleSubmit = () => {
      if (text === "") return
      if (isUpdate) {
        taskStore.updateTask(currentTaskId, text)
        setIsUpdate(false)
      } else {
        taskStore.addTask(text)
      }
      inputRef.current.clear()
      setText("")
      inputRef.current.blur()
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        testID="TaskScreen"
        style={FULL}
      >
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="taskScreen.title"
            leftIcon="back"
            onLeftPress={() => navigation.goBack()}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <FlatList
            ListEmptyComponent={
              <View style={EMPTY_CONTAINER}>
                <Text style={EMPTY_TITLE}>{translate("taskScreen.addAtask")}</Text>
              </View>
            }
            contentContainerStyle={FLAT_LIST}
            data={[...taskList]}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ListItem
                {...item}
                key={item.id}
                onPress={onPressTaskItem(item.id)}
                deleteHandler={deleteHandler(item.id)}
              />
            )}
          />
        </Screen>
        <View style={TEXT_INPUT_CONTAINER}>
          <View style={FULL}>
            <TextInput
              testID="TaskInput"
              underlineColor={color.palette.black}
              activeUnderlineColor={color.palette.black}
              style={{ backgroundColor: color.palette.white }}
              onSubmitEditing={handleSubmit}
              onChangeText={handleTextChange}
              onBlur={() => setIsUpdate(false)}
              value={text}
              ref={inputRef}
              returnKeyType={"done"}
              mode="flat"
              placeholder={translate("common.enterHere")}
              placeholderTextColor={color.palette.black}
            />
          </View>
          <Button mode="contained" onPress={handleSubmit} testID="SubmitButton">
            {isUpdate ? translate("common.update") : translate("common.add")}
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  },
)
