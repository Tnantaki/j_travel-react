// will run once, inside the 'mongo-init' container
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
});

if (rs.status().ok !== 1) {
  rs.initiate(cfg);
}

// mongo-init.js
// console.log('🚀 Starting replica set initialization...');

// try {
//   // Check if replica set is already initialized
//   var status = rs.status();
//   console.log('✅ Replica set already initialized:', status.set);
// } catch (err) {
//   console.log('⚠️  Replica set not initialized, initializing now...');
  
//   // Initialize the replica set
//   var config = {
//     _id: 'rs0',
//     members: [
//       { _id: 0, host: 'mongo1:27017', priority: 2 },
//       { _id: 1, host: 'mongo2:27017', priority: 1 },
//       { _id: 2, host: 'mongo3:27017', priority: 1 }
//     ]
//   };
  
//   var result = rs.initiate(config);
//   console.log('📋 Initiate result:', result);
  
//   if (result.ok === 1) {
//     console.log('✅ Replica set initiated successfully');
    
//     // Wait for primary election
//     console.log('⏳ Waiting for primary election...');
//     var attempts = 0;
//     var maxAttempts = 30;
    
//     while (attempts < maxAttempts) {
//       try {
//         var status = rs.status();
//         var primary = status.members.find(member => member.stateStr === 'PRIMARY');
        
//         if (primary) {
//           console.log('🎉 Primary elected:', primary.name);
//           console.log('📊 Final replica set status:');
//           printjson(rs.status());
//           break;
//         }
//       } catch (e) {
//         // Ignore errors during status check
//       }
      
//       attempts++;
//       console.log(`⏳ Attempt ${attempts}/${maxAttempts} - waiting for primary...`);
//       sleep(2000); // Wait 2 seconds
//     }
    
//     if (attempts >= maxAttempts) {
//       console.log('❌ Timeout waiting for primary election');
//     }
//   } else {
//     console.log('❌ Failed to initiate replica set:', result);
//   }
// }