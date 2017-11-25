using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class ColliderRangeToStartVideo : MonoBehaviour
{
    public VideoPlayer vp;

    private void OnTriggerEnter(Collider col)
    {
        if (col.gameObject.CompareTag("Player"))
        {
            Debug.Log("Player Entered");
            vp.Play();
        }
    }

    private void OnTriggerExit(Collider col)
    {
        if (col.gameObject.CompareTag("Player"))
        {
            Debug.Log("Player Exited");
            vp.Stop();
        }
    }
}
