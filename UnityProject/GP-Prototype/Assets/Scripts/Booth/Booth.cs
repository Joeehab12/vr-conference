using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Booth : MonoBehaviour
{
    public string boothLocation = "A";

    [SerializeField]
    Text companyName;
    ImageLoader boothImageLoader;
    UnzipAndRead boothUnzipAndRead;
    EmailSender mailSender;

    public BoothData data = new BoothData();

    void Start()
    {
        boothImageLoader = GetComponent<ImageLoader>();
        boothUnzipAndRead = GetComponent<UnzipAndRead>();
        mailSender = GetComponent<EmailSender>();

    }

    public void InitiateData(string name, string boothImageLink, string boothZipLink, string boothVideoLink)
    {
        data.name = name;
        data.boothImageLink = boothImageLink;
        data.boothZipLink = boothZipLink;
        data.boothVideoLink = boothVideoLink;

        LoadBoothData();
    }

    public void LoadBoothData()
    {
        companyName.text = data.name;
        boothImageLoader.LoadTextures(data.boothImageLink);
        boothImageLoader.LoadVideo(data.boothVideoLink, boothLocation);
        //boothUnzipAndRead.LoadZipData(data.boothZipLink);
        //boothVideo.LoadVideo(data.boothVideoLink);
    }

    public void SendMailToUser()
    {
        mailSender.SendZipData(this);
    }
}
