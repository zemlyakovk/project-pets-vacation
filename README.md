# final-project-pets-vacation


npx sequelize model:generate --name User --attributes first_name:string,last_name:string,email:string,sex:string,desc:text,phone:string,password:string,age:integer,profile_photo:string

npx sequelize model:generate --name Sitter --attributes user_id:integer,cat_flag:boolean,dog_flag:boolean,experience:integer,has_pet_flag:boolean,has_child:boolean,supervision_24:boolean,price_per_day:integer,housing_type:string,walking:boolean,staying:boolean,price_per_hour:integer,desc:text,active:boolean