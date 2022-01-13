APPCENTER_SECRET_KEY_IOS=$(grep APPCENTER_SECRET_KEY_IOS .env | cut -d '=' -f2)
APPCENTER_SECRET_KEY_ANDROID=$(grep APPCENTER_SECRET_KEY_ANDROID .env | cut -d '=' -f2)

sed -i '' "s/APPCENTER_SECRET_KEY_IOS/${APPCENTER_SECRET_KEY_IOS}/g" ./ios/AppCenter-Config.plist
sed -i '' "s/APPCENTER_SECRET_KEY_ANDROID/${APPCENTER_SECRET_KEY_ANDROID}/g" ./android/app/src/main/assets/appcenter-config.json

