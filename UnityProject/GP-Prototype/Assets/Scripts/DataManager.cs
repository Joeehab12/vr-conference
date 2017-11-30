using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class DataManager : MonoBehaviour
{
    //url + token=token;
    private const string SERVER_URL = "http://localhost:8000/";
    public const string CONFERENCE_URL = "12345xyzw";

    public LoginToken token;

    [HideInInspector]
    public BoothFromJoe boothsData;

    private Dictionary<string, Booth> MyBooths = new Dictionary<string, Booth>();

    void Start()
    {
        GetEachBooth();
        DownloadJSONFile();
    }

    void GetEachBooth()
    {
        var allOfThem = FindObjectsOfType<Booth>();
        foreach (var bothaya in allOfThem)
        {
            //Debug.Log(bothaya.boothLocation);
            MyBooths.Add(bothaya.boothLocation, bothaya);
        }
    }

    void DownloadJSONFile()
    {
        //Download JSON File and save it in the folder
        StartCoroutine(GetJSONFile(CONFERENCE_URL));
        //Download Videos
    }

    IEnumerator GetJSONFile(string ConferenceID)
    {
        Debug.Log("DataManager: Getting JSON File for conference: " + ConferenceID);
        string actualURL = SERVER_URL + "conferences/" + ConferenceID + "?token=" + token.Value;
        WWW www = new WWW(actualURL);

        yield return www;


        Debug.Log("JSON File Received: " + www.text);
        if (www.text == "")
        {
            Debug.Log("NO INTERNET CONNECTION");
            yield break;
        }
        string JsonString = www.text.Substring(1);
        JsonString = JsonString.Substring(JsonString.IndexOf('{'));
        JsonString = JsonString.Substring(0, JsonString.Length - 1);
        boothsData = JsonUtility.FromJson<BoothFromJoe>(JsonString);

        //Debug.Log(boothsData.booths[0].host_company);

        Debug.Log("DataManager: Processed the tokenFile");


        foreach (var both in boothsData.booths)
        {
            var currentBooth = MyBooths[both.location];
            currentBooth.InitiateData(both.host_company, both.banner, both.inner_graphics, both.outer_graphics, both.document, both.video);
            yield return null;
        }
    }
}
