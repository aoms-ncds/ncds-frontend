import React, { ChangeEvent, useEffect, useState } from 'react';
import { Autocomplete, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import SanctionedAsPerService from './extras/SanctionedAsPerService';
import FRServices from '../FR/extras/FRServices';
import ParticularersService from './extras/ParticularersService';
import { log } from 'console';

const Particulars = () => {
  const [category, setCategory] = useState<MainCategory[] | null>([]);
  const [showAddParticularDialog, setShowAddParticularDialog] = React.useState<'add' | 'edit' | false>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [languageToDelete, setLanguageToDelete] = useState<MainCategory | null>(null);
  // const [newCategory, setNewCategory] = useState<MainCategory[]>({
  //   name: '',
  //   subcategory1: [{
  //     name: '',
  //     subcategory2: [{
  //       name: '',
  //       subcategory3: [{
  //         name: '',
  //         narration: '',
  //       }],
  //     }],
  //   }],
  // });


  // interface MainCategory {
  //   _id: string;
  //   name: string;
  //   subcategory1: SubCategory1[];
  // }


  const initialCategoryState: MainCategory = {
    name: '',
    subcategory1: [{
      name: '',
      subcategory2: [{
        name: '',
        subcategory3: [{
          name: '',
          narration: '',
        }],
      }],
    }],
  };

  const [newCategory, setNewCategory] = useState<MainCategory>(initialCategoryState);
  // const [newCategory, setNewCategory]=useState<MainCategory[]>([])
  // const [newCategory, setNewCategory]=useState<MainCategory>({
  //   _id:'',
  //   name: '',
  //   subcategory1:[{
  //     name: '',
  //     subcategory2:[{
  //       name:'',
  //       subcategory3:[{
  //         name:'',
  //         narration:'',
  //       }]
  //   }]
  // }]
  // })

  const removeReason = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing reason',
      variant: 'info',
    });


    ParticularersService.delete(id)
      .then((res) => {
        if (category) {
          const newLanguage = category.filter((cat: any) => {
            return cat._id !== id;
          });
          setCategory(newLanguage);
        }
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  const handleClose = () => {
    setShowAddParticularDialog(false);
  };
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
    setLanguageToDelete(null);
  };
  const columns: GridColDef<MainCategory>[] = [
    {
      field: 'name',
      renderHeader: () => (<b>Main Category</b>),
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.name,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      renderHeader: () => (<b>Edit</b>),
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              setShowAddParticularDialog('edit');
              setNewCategory(params.row as MainCategory);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      renderHeader: () => (<b>Delete</b>),
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setConfirmDelete(true);
              setLanguageToDelete(params.row);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    FRServices.getMainCategory()
      .then((res) => {
        console.log(res.data, 'category');
        setCategory(res.data);
        handleClose();
        enqueueSnackbar({
          variant: 'success',
          message: res.message,
        });
      })
      .catch((res) => {
        console.log(res);
        handleClose();
        enqueueSnackbar({
          variant: 'error',
          message: res.message,
        });
      });
  }, []);


  useEffect(() => {
    console.log({ newCategory });
  }, [newCategory]);


  const addSubcategory1 = () => {
    setNewCategory((prev) => ({
      ...prev,
      subcategory1: [
        ...prev.subcategory1,
        {
          name: '',
          subcategory2: [],
        },
      ],
    }));
  };

  // const addSubcategory2 = (indexValue) => {

  //   // console.log(index);
  //   newCategory.subcategory1.map((item, index) => {
  //     if(indexValue == index){
  //       console.log(item.name,index)
  //     }
  //   })


  //   setNewCategory(prev => ({
  //     ...prev,
  //     subcategory2: [
  //       ...prev.subcategory2,
  //       {
  //         name:'',
  //          subcategory3: {
  //           name: '',
  //         }
  //       }
  //     ]
  //   }));

  //   // setNewCategory(prev => ({
  //   //   ...prev,
  //   //   subcategory1: [
  //   //     ...prev.subcategory1,
  //   //     {
  //   //       name:'',
  //   //       subcategory2: {
  //   //         name: '',
  //   //         // subcategory3: []
  //   //       }
  //   //     }
  //   //   ]
  //   // }));
  // };

  // const addSubcategory1 = () => {
  //   setNewCategory(prev => ({
  //     ...prev,
  //     subcategory1: [
  //       ...prev.subcategory1,
  //       {
  //         subcategory2: {
  //           name: '',
  //           subcategory3: []
  //         }
  //       }
  //     ]
  //   }));
  // };
  const addSubcategory2 = (indexValue: number) => {
    setNewCategory((prev) => ({
      ...prev,
      subcategory1: prev.subcategory1.map((item: SubCategory1, index: number) => {
        if (indexValue === index) {
          return {
            ...item,
            subcategory2: [
              ...item.subcategory2,
              {
                name: '',
                subcategory3: [],
              },
            ],
          };
        }
        return item;
      }),
    }));
  };


  // const addSubcategory3 = (indexValue,_index) => {
  //   setNewCategory(prev => ({
  //       ...prev,
  //       subcategory1: prev.subcategory1.map((item, index) => {
  //           if (indexValue === index) {
  //               return {
  //                   ...item,
  //                   subcategory2: item.subcategory2.map((j, subIndex) => {
  //                     if (indexValue === subIndex) {
  //                         return {
  //                             ...j,
  //                             subcategory3: [
  //                               ...item.subcategory3,
  //                               {
  //                                   name: '',

  //                               }
  //                           ]
  //                         };
  //                     }
  //                     return j;
  //                 })
  //             };
  //               };
  //               return item;
  //           })
  //       }))
  //   };


  // const addSubcategory3 = (indexValue:number, _index:number) => {
  //   setNewCategory((prev) => ({
  //     ...prev,
  //     subcategory1: prev.subcategory1.map((item:SubCategory1, index:number) => {
  //       if (_index === index) {
  //         return {
  //           ...item,
  //           subcategory2: item.subcategory2.map((j, subIndex:number) => {
  //             if (indexValue === subIndex) {
  //               return {
  //                 ...j,
  //                 subcategory3: [
  //                   ...j.subcategory3,
  //                   {
  //                     name: '',
  //                   },
  //                 ],
  //               };
  //             }
  //             return j;
  //           }),
  //         };
  //       }
  //       return item;
  //     }),
  //   }));
  // };
  const addSubcategory3 = (indexValue: number, _index: number) => {
    setNewCategory((prev) => ({
      ...prev,
      subcategory1: prev.subcategory1.map((item, index) => {
        if (_index === index) {
          return {
            ...item,
            subcategory2: item.subcategory2.map((j, subIndex) => {
              if (indexValue === subIndex) {
                return {
                  ...j,
                  subcategory3: [
                    ...j.subcategory3,
                    {
                      name: '',
                      narration: '', // Ensure 'narration' property is included
                    },
                  ],
                };
              }
              return j;
            }),
          };
        }
        return item;
      }),
    }));
  };

  const handleNameChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      subcategory1: prev.subcategory1.map((item: SubCategory1, i: number) =>
        i === index ?
          {
            ...item,
            name: value,
            // subcategory2: []
          } :
          item,
      ),
    }));
  };


  const handleNameChange2 = (indexValue: number, _index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      subcategory1: prev.subcategory1.map((item: SubCategory1, index: number) => {
        if (_index === index) {
          return {
            ...item,
            subcategory2: item.subcategory2.map((j, subIndex) => {
              if (indexValue === subIndex) {
                return {
                  ...j,
                  name: value,
                };
              }
              return j;
            }),
          };
        }
        return item;
      }),
    }));
  };


  // const handleNameChange3 = (_index:number, _index2:number, indexValue:number, e:ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   console.log(value, 'Value');
  //   setNewCategory((prev) => ({
  //     ...prev,
  //     subcategory1: prev.subcategory1.map((i: { subcategory2: any[] }, x: number) => {
  //       if (_index === x) {
  //         return {
  //           ...i,
  //           subcategory2: i.subcategory2.map((j, y) => {
  //             if (_index2 === y) {
  //               return {
  //                 ...j,
  //                 subcategory3: j.subcategory3.map((k: any, z: number) => {
  //                   if (indexValue === z) {
  //                     return {
  //                       ...k,
  //                       name: value,
  //                     };
  //                   }
  //                   return k;
  //                 }),
  //               };
  //             }
  //             return j;
  //           }),
  //         };
  //       }
  //       return i;
  //     }),
  //   }));
  // };
  const handleNameChange3 = (_index: number, _index2: number, indexValue: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      subcategory1: prev.subcategory1.map((item, x) => {
        if (_index === x) {
          return {
            ...item,
            subcategory2: item.subcategory2.map((subItem, y) => {
              if (_index2 === y) {
                return {
                  ...subItem,
                  subcategory3: subItem.subcategory3.map((subSubItem, z) => {
                    if (indexValue === z) {
                      return {
                        ...subSubItem,
                        name: value,
                      };
                    }
                    return subSubItem;
                  }),
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      }),
    }));
  };

  // const handleNameChange4 = (_index:number, _index2:number, indexValue:number, e:ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   console.log(value, 'Value');
  //   setNewCategory((prev) => ({
  //     ...prev,
  //     subcategory1: prev.subcategory1.map((i: { subcategory2: any[] }, x: number) => {
  //       if (_index === x) {
  //         return {
  //           ...i,
  //           subcategory2: i.subcategory2.map((j, y) => {
  //             if (_index2 === y) {
  //               return {
  //                 ...j,
  //                 subcategory3: j.subcategory3.map((k: any, z: number) => {
  //                   if (indexValue === z) {
  //                     return {
  //                       ...k,
  //                       narration: value,
  //                     };
  //                   }
  //                   return k;
  //                 }),
  //               };
  //             }
  //             return j;
  //           }),
  //         };
  //       }
  //       return i;
  //     }),
  //   }));
  // };

  const handleNameChange4 = (_index: number, _index2: number, indexValue: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      subcategory1: prev.subcategory1.map((item, x) => {
        if (_index === x) {
          return {
            ...item,
            subcategory2: item.subcategory2.map((subItem, y) => {
              if (_index2 === y) {
                return {
                  ...subItem,
                  subcategory3: subItem.subcategory3.map((subSubItem, z) => {
                    if (indexValue === z) {
                      return {
                        ...subSubItem,
                        narration: value,
                      };
                    }
                    return subSubItem;
                  }),
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      }),
    }));
  };

  return (
    <CommonPageLayout title="Particulars">
      <Dialog
        open={showAddParticularDialog as boolean}
        onClose={() => setShowAddParticularDialog(false)}
        PaperProps={{
          style: {
            width: '1000px',
          },
        }}
      >
        <DialogTitle>Add Particular</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (showAddParticularDialog === 'add') {
              ParticularersService.create(newCategory).then((res) => {
                setCategory((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                setNewCategory({
                  name: '',
                  subcategory1: [{
                    name: '',
                    subcategory2: [{
                      name: '',
                      subcategory3: [{
                        name: '',
                        narration: '',
                      }],
                    }],
                  }],
                });
              });
            } else {
              ParticularersService.edit(newCategory).then((res) => {
                setCategory((langs: any) => (langs === null ? null : langs?.map((lang: any): any => (lang._id === newCategory ? res.data : lang))));
                setNewCategory({
                  name: '',
                  subcategory1: [{
                    name: '',
                    subcategory2: [{
                      name: '',
                      subcategory3: [{
                        name: '',
                        narration: '',
                      }],
                    }],
                  }],
                });
                if (res.data) {
                  window.location.reload();
                }
              });
            }
            // const newLanguage = category?.filter((cat: any) => {
            //   return cat._id !== languageToDelete?._id;
            // });
            // setCategory(newLanguage);
            handleClose();
            // window.location.reload()
          }}
        >
          <DialogActions>
            <Button onClick={() => setShowAddParticularDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <Button variant="contained" onClick={addSubcategory1}>ADD SUB CAT  1</Button>
                <br />
                <br />
                <TextField
                  label="Main Category"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory((prevState) => ({ ...prevState, name: e.target.value }))}
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                {/* <Button onClick={()=>setNewCategory([ ...newCategory ?? [],subcategory1:{...newCategory.subcategory1,name:'',subcategory2:[]}])}> add</Button> */}
                {newCategory.subcategory1?.map((item: SubCategory1, _index: number) => (
                  <div key={_index}>
                    <TextField
                      type="text"
                      label="Sub Category 1"
                      value={item.name || ''}
                      onChange={(e) => handleNameChange(_index, e as ChangeEvent<HTMLInputElement>)}
                      fullWidth

                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={() => addSubcategory2(_index)}>ADD Sub Cat 2</Button>
                    <br />
                    <br />
                    {item.subcategory2.map((item, _index2) => (
                      <div key={_index2}>
                        <br />
                        <TextField
                          label="Sub Category 2"
                          type="text"
                          value={item.name || ''}
                          onChange={(e) => handleNameChange2(_index2, _index, e as ChangeEvent<HTMLInputElement>)}
                          fullWidth
                        />
                        <br />
                        <br />
                        <Button variant="contained" onClick={() => addSubcategory3(_index2, _index)}>ADD Sub Cat 3</Button>
                        <br />
                        <br />
                        {item.subcategory3.map((item, index) => (
                          <div key={index}>
                            <TextField
                              label="Sub Category 3"
                              type="text"
                              value={item.name || ''}
                              onChange={(e) => handleNameChange3(_index, _index2, index, e as ChangeEvent<HTMLInputElement>)}
                              fullWidth
                            />
                            <br />
                            <br />
                            <TextField
                              label="Narration"
                              type="text"
                              value={item.narration || ''}
                              onChange={(e) => handleNameChange4(_index, _index2, index, e as ChangeEvent<HTMLInputElement>)}
                              fullWidth
                            />
                            <br />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}


                {/* <TextField
                  label="Sub Category 1"
                  value={newCategory.subcategory1?.[0]?.name as unknown as MainCategory}
                  onChange={(e) => setNewCategory(prevState => ({
                    ...prevState,
                    subcategory1: [{ ...prevState.subcategory1[0], name: e.target.value }],
                  }))}
                  fullWidth
                /> */}

              </Grid>
              {/* <Grid item md={12}>
                <TextField
                  label="Sub Category 2"
                  value={newCategory.subcategory1?.[0]?.subcategory2?.[0]?.name}
                  onChange={(e) => setNewCategory(prevState => ({
                    ...prevState,
                    subcategory1: [{
                      ...prevState.subcategory1[0],
                      subcategory2: [{ ...prevState.subcategory1?.[0]?.subcategory2?.[0], name: e.target.value }],
                    }],
                  }))}
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Sub Category 3"
                  value={newCategory.subcategory1?.[0]?.subcategory2?.[0]?.subcategory3?.[0]?.name}
                  onChange={(e) => setNewCategory(prevState => ({
                    ...prevState,
                    subcategory1: [{
                      ...prevState.subcategory1[0],
                      subcategory2: [{
                        ...prevState.subcategory1[0]?.subcategory2[0],
                        subcategory3: [{ ...prevState.subcategory1?.[0]?.subcategory2?.[0]?.subcategory3?.[0], name: e.target.value }],
                      }],
                    }],
                  }))}
                  fullWidth
                />
              </Grid> */}
              {/* <Grid item md={12}>
                <TextField
                  label="Narration"
                  value={newCategory.subcategory1?.[0]?.subcategory2?.[0]?.subcategory3?.[0]?.narration}
                  onChange={(e) => setNewCategory(prevState => ({
                    ...prevState,
                    subcategory1: [{
                      ...prevState.subcategory1[0],
                      subcategory2: [{
                        ...prevState.subcategory1?.[0]?.subcategory2?.[0],
                        subcategory3: [{ ...prevState.subcategory1?.[0]?.subcategory2?.[0]?.subcategory3?.[0], narration: e.target.value }],
                      }],
                    }],
                  }))}
                  fullWidth
                />
              </Grid> */}
            </Grid>
          </DialogContent>

        </form>
      </Dialog>

      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this particular?</Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setConfirmDelete(false);
            setLanguageToDelete(null);
          }} variant="text">
            No, Cancel
          </Button>
          <Button onClick={() => {
            if (languageToDelete) {
              removeReason((languageToDelete as any)._id);
            }
            setConfirmDelete(false);
            setLanguageToDelete(null);
          }} variant="contained" color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*
      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              SanctionedAsPerService.create(newAsPer).then((res) => {
                setAsPer((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                setNewAsPer({
                  asPer: '',
                });
              });
            } else {
              SanctionedAsPerService.edit(newAsPer).then((res) => {
                setAsPer((langs) => (langs === null ? null : langs?.map((lang) => (lang._id === newAsPer._id ? res.data : lang))));

                setNewAsPer({
                  asPer: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Sanctioned as per</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Sanctioned as per"
              label="Enter sanctioned as per to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newAsPer.asPer}
              onChange={(e) => setNewAsPer((lang) => ({ ...lang, asPer: e.target.value }))}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewAsPer({
                  asPer: '',
                });
              }}
              variant="contained"
              sx={{ right: 20, marginBottom: 2 }}
              color="error"
            >
              Close
            </Button>
            <Button type="submit" variant="contained" sx={{ right: 20, marginBottom: 2 }} color="success">
              {dialogAction}
            </Button>
          </DialogActions>
        </form>
      </Dialog> */}

      <Card>
        <Grid container spacing={2} >
          <Grid item xs={12} sx={{ px: 2 }}>
            <br />
            <Button
              variant="contained"
              sx={{ float: 'right', marginBottom: 3 }}
              startIcon={<AddIcon />}
              onClick={() => {
                // setDialogAction('add');
                setShowAddParticularDialog('add');
              }}
            >
              Add new
            </Button>
          </Grid>
        </Grid>

        <DataGrid
          sx={{ height: '80vh', width: '100%' }}
          // style={{ height: '80vh', width: '100%' }}
          rows={category ?? []} columns={columns} getRowId={(row: any) => row._id} loading={category === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default Particulars;
