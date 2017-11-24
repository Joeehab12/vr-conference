using UnityEngine;
using System.Collections;
using System.IO;

public class UnzipAndRead : MonoBehaviour
{
    public GameObject A4PaperPrefab;
    public Transform pos;

    const string ZIPEDFOLDERNAME = "ZIPPED";
    const string EXTRACTEDFOLDERNAME = "UNZIPPED";

    //void OnGUI()
    //{
    //    if (GUI.Button(new Rect(0, 0, 100, 100), "load"))
    //    {
    //        StartCoroutine(Load());
    //    }
    //}

    public void LoadZipData(string url, string location)
    {
        StartCoroutine(Load(url, location));
    }

    IEnumerator Load(string url, string boothLocation)
    {
        //check if url is empty .. return
        //check if extracted folder exisist .. skip downloading and do the zipping only
        //download (no need to check the zipped folder because it might be corrupted (because it did not finish this part w 3ml foler)

        Debug.Log("ZIP: Started Downloading ZIP File for booth " + boothLocation + " with url: " + url);

        string zipPath = Path.Combine(Application.streamingAssetsPath, ZIPEDFOLDERNAME + "/BoothZIP_" + boothLocation + ".zip");
        string exportPath = Path.Combine(Application.streamingAssetsPath, EXTRACTEDFOLDERNAME + "/BoothZIP_" + boothLocation);

        //WWW www = new WWW("https://osdn.net/frs/g_redir.php?m=netix&f=%2Ffotohound%2Fsample-pictures%2FSample%2FSample-Pictures.zip");
        WWW www = new WWW(url);

        yield return www;
        //yield return null;

        Debug.Log("ZIP: Downloded zipped file for booth " + boothLocation);

        //Debug.Log("IMAGES DOWNLOADED");
        var data = www.bytes;
        File.WriteAllBytes(zipPath, data);
        ZipUtil.Unzip(zipPath, exportPath);

        //Debug.Log("IMAGES UNZIPED");

        Debug.Log("ZIP: Unzipped zipped file for booth " + boothLocation);


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

        Debug.Log("ZIP: Completed ZIP file to textures and instatiting them");


        //File.Delete(zipPath);
        //Directory.Delete(exportPath, true);
    }
}
