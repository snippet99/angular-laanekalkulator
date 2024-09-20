{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "appServicePlanId": {
      "type": "string"
    },
    "environment": {
      "type": "string"
    },
    "applicationName": {
      "type": "string"
    },
    "resourceGroupName": {
      "type": "string"
    },
    "location": {
      "type": "string"
    },
    "allowIPParam": {
      "type": "string"
    },
    "resourceTags": {
      "type": "object",
      "defaultValue": {
        "Application": "{applicationName}",
        "createdBy": "GitHub Actions"
      }
    }
  },
  "variables": {
    "appInsightsName": "[format('noeheltannet-test-gh-appinsights-{0}', parameters('environment'))]"
  },
  "resources": [
    {
      "type": "Microsoft.Resources/deployments",
      "apiVersion": "2021-04-01",
      "name": "appInsightsDeploy",
      "properties": {
        "mode": "Incremental",
        "templateLink": {
          "uri": "./modules/appInsights.bicep",
          "contentVersion": "1.0.0.0"
        },
        "parameters": {
          "appInsightsName": {
            "value": "[variables('appInsightsName')]"
          },
          "tags": {
            "value": "[parameters('resourceTags')]"
          },
          "location": {
            "value": "[parameters('location')]"
          }
        }
      }
    },
    {
      "type": "Microsoft.Resources/deployments",
      "apiVersion": "2021-04-01",
      "name": "[format('{0}{1}Deploy', parameters('applicationName'), parameters('environment'))]",
      "properties": {
        "mode": "Incremental",
        "templateLink": {
          "uri": "./modules/webAppService.bicep",
          "contentVersion": "1.0.0.0"
        },
        "parameters": {
          "applicationName": {
            "value": "[parameters('applicationName')]"
          },
          "tags": {
            "value": "[parameters('resourceTags')]"
          },
          "appInsightsInstrumentationKey": {
            "value": "[reference(resourceId('Microsoft.Resources/deployments', 'appInsightsDeploy')).outputs.appInsightsInstrumentationKey.value]"
          },
          "appServicePlanId": {
            "value": "[parameters('appServicePlanId')]"
          },
          "location": {
            "value": "[parameters('location')]"
          },
          "allowIPParam": {
            "value": "[parameters('allowIPParam')]"
          }
        }
      }
    }
  ],
  "outputs": {}
}
