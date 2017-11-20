using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Booth : MonoBehaviour
{
    public string BoothName = "A";

    ImageLoader boothImageLoader;
    UnzipAndRead boothUnzipAndRead;

    void Start()
    {
        boothImageLoader = GetComponent<ImageLoader>();
        boothUnzipAndRead = GetComponent<UnzipAndRead>();

    }

    public void InitiateData(string boothImageLink, string boothZipLink/*, string boothVideoLink */)
    {
        boothImageLoader.LoadTextures(boothImageLink);
        boothUnzipAndRead.LoadZipData(boothZipLink);
        //boothVideo.LoadVideo(boothVideoLink);
    }
}
