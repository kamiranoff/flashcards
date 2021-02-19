APPCENTER_SECRET_KEY=$(grep APPCENTER_SECRET_KEY .env | cut -d '=' -f2)
sed -i '' "s/APPCENTER_SECRET_KEY/${APPCENTER_SECRET_KEY}/g" ./ios/AppCenter-Config.plist
