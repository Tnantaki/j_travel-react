// {
// 	"user": "userID",
//     "username": "mos2 tnanki",
// 	"address": {
// 		"street": "Sukhumvit Road",
// 		"building": "Siam Paragon",
// 		"houseNo": "123",
// 		"district": "Watthana",
// 		"postalCode": "10110",
// 		"subDistrict": "Khlong Tan Nuea",
// 		"province": "Bangkok",
// 		"country": "Thailand"
// 	},
// 	"phone": "0812345678",
// 	"email": "mos@email.com",
// 	"birthday": "1990-05-15",
//     "gender": "Male",
//     "idNumber": "1111111111111",
//     "passportNumber": "1234"
// }
import { Create, PasswordInput, SimpleForm, TextInput } from "react-admin"

const ProfileCreate = () => ( 
  <Create>
    <SimpleForm>
      <TextInput label="Email Address" source="email" type="email" />
      <PasswordInput label="Password" source="password" />
    </SimpleForm>
  </Create>
 )

export default ProfileCreate