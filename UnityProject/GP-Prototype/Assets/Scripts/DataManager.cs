using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class DataManager : MonoBehaviour
{
    //url + token=token;
    public const string CONFERENCE_URL = "1xgchdhshd";
    string JSONFileName = "jsonFile.json";

    public BoothFromJoe boothsData
    {
        get
        {
            return boothsData;
        }

        private set
        {
            boothsData = value;
        }
    }

    void Start()
    {
        DownloadJSONFile();
    }

    void DownloadJSONFile()
    {
        //Download JSON File and save it in the folder
        //StartCoroutine(GetJSONFile(CONFERENCE_URL));
        //Download Videos
    }

    IEnumerator GetJSONFile(string url)
    {
        WWW www = new WWW(url);

        yield return www;

        string filePath = Path.Combine(Application.streamingAssetsPath, JSONFileName);
        var x = File.Open(filePath, FileMode.OpenOrCreate);
        x.Write(www.bytes, 0, www.bytesDownloaded);
        x.Close();


        LoadDataFromJoe();
    }

    void LoadDataFromJoe()
    {
        string filePath = Path.Combine(Application.streamingAssetsPath, JSONFileName);

        if (File.Exists(filePath))
        {
            string dataAsJson = File.ReadAllText(filePath);

            BoothFromJoe loadedData = JsonUtility.FromJson<BoothFromJoe>(dataAsJson);
            boothsData = loadedData;

            //Debug.Log("GGLGKJELDJSESELSEIDS");
            //Debug.Log(loadedData.booths[0].host_company);
            //Debug.Log("GGLGKJELDJSESELSEIDS");
        }
        else
        {
            Debug.LogError("JSON FILE NOT FOUND PLEASE BE CAREFUL NEXT TIME OR I WILL GET YOU MYSELF");
        }
    }
}
