import { exec } from "child_process";

const args = process.argv.slice(2);
const entity = args[0];

console.log("\x1b[35m", "Exécution des scripts d'insertion...", "\x1b[0m");
console.log(entity ? `Entité spécifiée: ${entity}` : "Aucune entité spécifiée");

const scriptMap: { [key: string]: string } = {
  role: "insertRole.ts",
  categoryProduct: "insertCategoryProduct.ts",
  product: "insertProducts.ts",
  user: "insertUser.ts",
  farmer: "insertFarmers.ts",
  productFarmer: "updateProductFarmer.ts",
  place: "insertPlaces.ts",
  command: "insertCommand.ts",
};

// On verifie que l'entité spécifiée existe
if (entity && !scriptMap[entity]) {
  console.error("\x1b[31m", `Entité spécifiée invalide: ${entity}`, "\x1b[0m");
  process.exit(1);
}

// Fonction pour exécuter un script et retourner une promesse
function runScript(scriptPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = exec(
      `npx ts-node ${scriptPath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de l'exécution de ${scriptPath}:`, error);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`Erreur standard pour ${scriptPath}:`, stderr);
        }
        console.log(`Sortie standard pour ${scriptPath}:`, stdout);
        resolve();
      }
    );

    process.on("exit", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `Le script ${scriptPath} s'est terminé avec le code ${code}`
          )
        );
      } else {
        resolve();
      }
    });
  });
}

const scriptsToRun = entity ? [scriptMap[entity]] : Object.values(scriptMap);

// Fonction pour exécuter les scripts séquentiellement
async function runScriptsSequentially(scripts: string[]) {
  for (const script of scripts) {
    try {
      console.log("\x1b[35m", `Exécution de ${script}...`, "\x1b[0m");
      await runScript(script);
      console.log("\x1b[35m", `${script} terminé avec succès.`, "\x1b[0m");
    } catch (error) {
      console.error(`Erreur lors de l'exécution de ${script}:`, error);
      process.exit(1);
    }
  }
  //On met un commentaire en couleur pour la fin de l'exécution
  console.log(
    "\x1b[35m",
    "Toutes les entités ont été insérées avec succès",
    "\x1b[0m"
  );
}

// Exécution des scripts
runScriptsSequentially(scriptsToRun);
