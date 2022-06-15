/* eslint-disable no-undef */
sap.ui.define(
  [
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "allocations/ext/fragment/Tree",
    "sap/m/TableSelectDialog",
  ],
  function (MessageToast, Dialog, Button, Tree, TableSelectDialog) {
    "use strict";

    return {
      onPress1: function (oEvent) {
        // example with tableSelectDialog
        var dialog = new TableSelectDialog("TableSelectDialog1", {
          title: "Select values",
          noDataText: "No data available",
          columns: [
            new sap.m.Column({
              header: new sap.m.Text({
                text: "Column1"
              })
            }),
            new sap.m.Column({
              header: new sap.m.Text({
                text: "Column2"
              })
            })
          ],
          items: [
            new sap.m.ColumnListItem({
              cells: [
                new sap.m.FlexBox({
                  justifyContent: "SpaceBetween",
                  alignItems: "Center",
                  items: [
                    new sap.m.Label({
                      text: "foo"
                    }),
                    new sap.m.Select({
                      items: [
                        new sap.ui.core.Item({
                          text: "bar"
                        })
                      ]
                    }),
                  ]
                })
              ]
            }),
            new sap.m.ColumnListItem({
              cells: [
                new sap.m.FlexBox({
                  justifyContent: "SpaceBetween",
                  alignItems: "Center",
                  items: [
                    new sap.m.Label({
                      text: "longerfoo"
                    }),
                    new sap.m.Select({
                      items: [
                        new sap.ui.core.Item({
                          text: "barfits"
                        })
                      ]
                    }),
                  ]
                })
              ]
            })
          ],
          cancel: function () {
            dialog.destroy();
          },
          confirm: function () {
            dialog.destroy();
          },
        });
        dialog.open();
      },
      onPress2: function (oEvent) {
        // example with react component
        const valueContainerId = "tree-value";
         const oContext = oEvent.getSource().getBindingContext();
        
        const currentValue = oContext.getObject().formula;

         var dialog = new Dialog({
          contentWidth: "1000px",
          contentHeight: "600px",
          title: "Select values",
          type: "Message",
          content: new sap.ui.core.HTML({
            content: `<div id="root" class="${window.theme || 'horizon'}"></div><input value="" type="hidden" id="${valueContainerId}" />`,
          }),
          afterOpen: function () {
            const tree = new Tree();
            const treeContainer = document.getElementById("root");
            const valueContainer = document.getElementById(valueContainerId);
            tree.render(treeContainer, valueContainer, currentValue);
          },
          beginButton: new Button({
            text: "Submit",
            press: function () {
              const valueContainer = document.getElementById(valueContainerId);
              const value = valueContainer.getAttribute("value");
              // MessageToast.show(`Selected value: ${value}`);
              // const parsedValue = JSON.parse(value);
              // const displayValue = parsedValue.map(item => `${item.OP} ${item.LOW}`).join('; ');
              oContext.setProperty('formula', value);
 
              dialog.close();
            },
          }),
          endButton: new Button({
            text: "Cancel",
            press: function () {
              dialog.close();
            },
          }),
          afterClose: function () {
            dialog.destroy();
          },
        });

        dialog.open();
      },
    };
  }
);
