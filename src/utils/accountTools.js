import Pool from "./userPool";

export const getSession = async () =>
await new Promise((resolve, reject) => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.getSession(async (err, session) => {
      if (err) {
        reject();
      } else {
        const attributes = await new Promise((resolve, reject) => {
          user.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err);
            } else {
              const results = {};
              console.log(attributes);
              for (let attribute of attributes) {
                const { Name, Value } = attribute;
                results[Name] = Value;
              }

              resolve(results);
            }
          });
        });

        resolve({
          user,
          ...session,
          ...attributes
        });
      }
    });
  } else {
    reject();
  }
});