using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Booth : MonoBehaviour
{
    public string BoothName = "A";

    [SerializeField]
    Text companyName;
    ImageLoader boothImageLoader;
    UnzipAndRead boothUnzipAndRead;

    void Start()
    {
        boothImageLoader = GetComponent<ImageLoader>();
        boothUnzipAndRead = GetComponent<UnzipAndRead>();

    }

    public void InitiateData(string name, string boothImageLink, string boothZipLink, string boothVideoLink )
    {
        companyName.text = name;
        boothImageLoader.LoadTextures(boothImageLink);
        //boothUnzipAndRead.LoadZipData(boothZipLink);
        //boothVideo.LoadVideo(boothVideoLink);
    }
}
