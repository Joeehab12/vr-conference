using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class ColliderRangeToStartVideo : MonoBehaviour
{
    public VideoPlayer vp;

    public GameObject[] objects;

    private void OnTriggerEnter(Collider col)
    {
        Debug.Log("Trigger enter " + col.gameObject.name);
        if (col.gameObject.CompareTag("Player"))
        {
            Debug.Log("Player Entered");
            vp.Play();

            foreach (var go in objects)
            {
                go.SetActive(true);
            }
        }
    }

    private void OnTriggerExit(Collider col)
    {
        if (col.gameObject.CompareTag("Player"))
        {
            Debug.Log("Player Exited");
            vp.Stop();

            foreach (var go in objects)
            {
                go.SetActive(false);
            }
        }
    }
}
