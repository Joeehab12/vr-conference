using UnityEngine;
using System.Collections;
using System.IO;

public class UnzipAndRead : MonoBehaviour
{
    public GameObject A4PaperPrefab;
    public Transform pos;

    //void OnGUI()
    //{
    //    if (GUI.Button(new Rect(0, 0, 100, 100), "load"))
    //    {
    //        StartCoroutine(Load());
    //    }
    //}

    public void LoadZipData(string url)
    {
        StartCoroutine(Load(url));
    }

    IEnumerator Load(string url)
    {
        string zipPath = "ZIP_Compressed" + "/test.zip";
        string exportPath = "ZIP_Extracted";

        //WWW www = new WWW("https://osdn.net/frs/g_redir.php?m=netix&f=%2Ffotohound%2Fsample-pictures%2FSample%2FSample-Pictures.zip");
        WWW www = new WWW(url);

        yield return www;
        //yield return null;

        //Debug.Log("IMAGES DOWNLOADED");
        var data = www.bytes;
        File.WriteAllBytes(zipPath, data);
        ZipUtil.Unzip(zipPath, exportPath);

        //Debug.Log("IMAGES UNZIPED");

        string[] fileNames = Directory.GetFiles(exportPath);

        float paperThickness = 0.02f;
        int i = 0;
        Debug.Log(fileNames[2]);
        foreach (var n in fileNames)
        {
            var tex = new Texture2D(4, 4, TextureFormat.DXT1, false);

            var imageData = File.ReadAllBytes(n);
            tex.LoadImage(imageData);

            var paper = Instantiate(A4PaperPrefab);
            paper.transform.position = pos.transform.position + Vector3.up * (3.0f / 2.0f) * (paperThickness) * i++;
            paper.transform.localScale = new Vector3(0.2f, paperThickness, .3f);
            paper.GetComponent<Renderer>().material.mainTexture = tex;
            yield return null;
        }

        Debug.Log("Completed");


        File.Delete(zipPath);
        Directory.Delete(exportPath, true);
    }
}
