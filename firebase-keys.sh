AD_MOB_IOS_APP_ID_VALUE=$(grep AD_MOB_IOS_APP_ID .env | cut -d '=' -f2)
AD_MOB_ANDROID_APP_ID_VALUE=$(grep AD_MOB_ANDROID_APP_ID .env | cut -d '=' -f2)

echo "create ad_mob_value for ios"
sed -i '' "s/AD_MOB_IOS_APP_ID/${AD_MOB_IOS_APP_ID_VALUE}/g" ./firebase.json
echo "create ad_mob_value for android"
sed -i '' "s/AD_MOB_ANDROID_APP_ID/${AD_MOB_ANDROID_APP_ID_VALUE}/g" ./firebase.json
