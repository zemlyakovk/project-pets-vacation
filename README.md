# final-project-pets-vacation


npx sequelize model:generate --name Address --attributes user_id:integer,address:string,zip_code:string,region:string,district:string,city:string,settlement:string,street:string,latitude:float,longitude:float



 const [newAddress, created] = await Address.findOrCreate({
        where: {
          address,
          sitter_id: 
        },
        defaults: {
          address, zip_code, region, district, city, settlement, street, latitude, longitude
        }
      })

Проверка DEV
