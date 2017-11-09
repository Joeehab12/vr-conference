using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class DataManager : MonoBehaviour {

	void Start () {
        LoadDataFromJoe();
	}
	
	void Update () {
		
	}


    void LoadDataFromJoe(string fName = "jsonFile.json")
    {
        string filePath = Path.Combine(Application.streamingAssetsPath, fName);

        if (File.Exists(filePath))
        {
            string dataAsJson = File.ReadAllText(filePath);

            BoothFromJoe loadedData = JsonUtility.FromJson<BoothFromJoe>(dataAsJson);

            Debug.Log("GGLGKJELDJSESELSEIDS");
            Debug.Log(loadedData.booths[0].host_company);
            Debug.Log("GGLGKJELDJSESELSEIDS");
        }
        else
        {
            Debug.LogError("JSON FILE NOT FOUND PLEASE BE CAREFUL NEXT TIME OR I WILL GET YOU MYSELF");
        }
    }
}
