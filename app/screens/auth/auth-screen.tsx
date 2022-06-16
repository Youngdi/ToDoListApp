import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import * as LocalAuthentication from "expo-local-authentication"
import { Button } from "react-native-paper"
import { ViewStyle, View, Linking, Platform } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { translate } from "../../i18n"

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  justifyContent: "flex-end",
  alignItems: "center",
}
const FULL: ViewStyle = {
  flex: 1,
}

const TEXT_HINT = {
  color: color.palette.black,
}
const BUTTON = {
  borderRadius: 20,
  marginTop: 20,
  marginBottom: 30,
}

export const AuthScreen: FC<StackScreenProps<NavigatorParamList, "auth">> = observer(
  function AuthScreen({ navigation }) {
    const openAppSettings = () => {
      if (Platform.OS === "ios") {
        Linking.openURL("app-settings:")
      } else {
        Linking.sendIntent("android.settings.SECURITY_SETTINGS")
      }
    }
    const unlockHandler = async () => {
      const { success } = await LocalAuthentication.authenticateAsync()
      if (success) {
        navigation.push("task")
      } else {
        openAppSettings()
      }
    }

    return (
      <View testID="AuthScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Text style={TEXT_HINT}>{translate("auth.setAuth")}</Text>
          <Button
            testID="GoToSettingButton"
            mode="contained"
            color={color.palette.navyBlue}
            style={BUTTON}
            onPress={unlockHandler}
          >
            {translate("auth.goToSetting")}
          </Button>
          <Button
            mode="text"
            testID="GoToSettingButtonForTesting"
            style={{ opacity: 0 }}
            onPress={() => navigation.push("task")}
          >
            {""}
          </Button>
        </Screen>
      </View>
    )
  },
)
