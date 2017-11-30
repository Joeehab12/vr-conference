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

    public void InitiateData(string name, string boothBannerImageLink, string boothInnerGraphicsLink, string boothOuterGraphicsLink, string boothZipLink, string boothVideoLink)
    {
        data.name = name;
        data.boothBannerImageLink = boothBannerImageLink;
        data.boothOuterGraphicsLink = boothOuterGraphicsLink;
        data.boothInnerGraphicsLink = boothInnerGraphicsLink;
        data.boothZipLink = boothZipLink;
        data.boothVideoLink = boothVideoLink;

        LoadBoothData();
    }

    public void LoadBoothData()
    {
        companyName.text = data.name;
        boothImageLoader.LoadBanner(data.boothBannerImageLink);
        boothImageLoader.LoadVideo(data.boothVideoLink, boothLocation);
        boothImageLoader.LoadOuterGraphics(data.boothOuterGraphicsLink);
        boothImageLoader.LoadInnerGraphics(data.boothInnerGraphicsLink);
        boothUnzipAndRead.LoadZipData(data.boothZipLink, boothLocation);
    }

    public void SendMailToUser()
    {
        mailSender.SendZipData(this);
    }
}
