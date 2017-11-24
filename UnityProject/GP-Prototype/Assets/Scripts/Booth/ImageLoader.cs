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


    public IEnumerator LoadTextures(string imageURL)
    {
        Texture2D tex;
        tex = new Texture2D(4, 4, TextureFormat.DXT1, false);
        WWW www = new WWW(imageURL);
        yield return www;
        www.LoadImageIntoTexture(tex);
        foreach (var rend in rends)
        {
            rend.materials[1].mainTexture = tex;
        }
    }


    public void CALLMEPLEASE()
    {
        StartCoroutine(LoadVideo("http://techslides.com/demos/sample-videos/small.mp4", ""));
    }

    string path;
    public VideoPlayer vp;

    public IEnumerator LoadVideo(string videoURL, string location)
    {
        WWW www = new WWW(videoURL);
        yield return www;
        path = Path.Combine(Application.streamingAssetsPath, "Vid.mp4");
        File.WriteAllBytes(path, www.bytes);

        Debug.Log("Done");

        vp.url = path;

        //videoRend.material.mainTexture = movie;

        vp.Play();

    }
}
