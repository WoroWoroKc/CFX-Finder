local xPlayer = ESX.GetPlayerFromId(playerId)
xPlayer.triggerEvent("wieczorVehicleShop:addCar", vehicleData.model, vehicleData.label)
