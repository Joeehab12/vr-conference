using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

[System.Serializable]
public class BoothFromJoe
{
    public booths[] booths;
}

[System.Serializable]
public class booths
{
    public string banner;
    public string document;
    public string host_company;
    public string location;
    public string video;
}