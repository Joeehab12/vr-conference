using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Video;

public class ImageLoader : MonoBehaviour
{
    //public string url = "https://docs.unity3d.com/uploads/Main/ShadowIntro.png";
    public Renderer[] rends;

    public Renderer videoRend;


    public void LoadTextures(string imgeURL)
    {
        StartCoroutine(LoadTexturesCo(imgeURL));
    }

    IEnumerator LoadTexturesCo(string imageURL)
    {
        Debug.Log("TEXTURE: Loading Image with URL: " + imageURL);
        Texture2D tex;
        tex = new Texture2D(4, 4, TextureFormat.DXT1, false);
        WWW www = new WWW(imageURL);
        yield return www;
        www.LoadImageIntoTexture(tex);

        Debug.Log("TEXTURE: Completed loading Image with URL: " + imageURL);

        foreach (var rend in rends)
        {
            rend.materials[1].mainTexture = tex;
        }
    }


    //public void CALLMEPLEASE(string videoURL, string location)
    //{
    //    StartCoroutine(LoadVideoCo(videoURL, location));
    //    //StartCoroutine(LoadVideo("http://techslides.com/demos/sample-videos/small.mp4", ""));
    //}

    string path;
    public VideoPlayer vp;

    public void LoadVideo(string videoURL, string location)
    {
        StartCoroutine(LoadVideoCo(videoURL, location));
    }

    IEnumerator LoadVideoCo(string videoURL, string location)
    {
        Debug.Log("VIDEO: Loading Video for booth " + location + ", with URL: " + videoURL);
        WWW www = new WWW(videoURL);
        yield return www;
        path = Path.Combine(Application.streamingAssetsPath, "Booth" + location + ".mp4");
        File.WriteAllBytes(path, www.bytes);

        Debug.Log("VIDEO: Completed loading video for booth: " + location);

        vp.url = path;

        //videoRend.material.mainTexture = movie;
        BootVideoPlayStop(true);
        BootVideoPlayStop(false);
    }

    void BootVideoPlayStop(bool status)
    {
        if (status)
            vp.Play();
        else
            vp.Stop();
    }
}
