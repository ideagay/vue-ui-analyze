<template>
    <div>
        <PageHeader title="项目依赖">
            <div>
                <SearchInput v-model="search"/>
                <el-button class="install-btn" type="primary" round size="mini" @click="dialogFormVisible = true">安装依赖</el-button>
            </div>
        </PageHeader>
        <div class="content">
            <h2>运行依赖</h2>
            <list-item v-for="item in dependence.dependencies" :key="item.name"
            :item="item"></list-item>
            <h2>开发依赖</h2>
            <list-item v-for="item in dependence.devDependencies" :key="item.name"
            :item="item"></list-item>
        </div>
        <el-dialog title="安装依赖" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="80px">
                <el-form-item label="类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="S">运行依赖</el-radio>
                        <el-radio label="D">开发依赖</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name" type="textarea" placeholder="请输入npm包名及版本号，例如lodash@latest,多个包名之间用空格分隔"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" round @click="installDependence">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import PageHeader from '@/components/PageHeader';
import SearchInput from '@/components/SearchInput';
import ListItem from './list-item';

export default {
    name: 'Dependence',
    data () {
        return {
            search: '',
            dialogFormVisible: false,
            form: {
                name: '',
                type: 'S'
            },
            dependence: {
                dependencies: [],
                devDependencies: []
            }
        };
    },
    computed: {
        _dependence: function() {
            return this.$store.state.dependence;
        }
    },
    apollo: {
        dependence: {
            query: gql`query {
                dependence {
                    dependencies {
                        version
                        name
                    }
                    devDependencies {
                        version
                        name
                    }
                }
            }`,
            result(result) {
                this.$store.commit('setDependence', result.data.dependence);
            }
        },
    },
    watch: {
        search: function(val) {
            const dependence = Object.assign({}, this._dependence);
            this.dependence.dependencies = dependence.dependencies.filter((v) => v.name.indexOf(val) > -1);
            this.dependence.devDependencies = dependence.devDependencies.filter((v) => v.name.indexOf(val) > -1);
        }
    },
    methods: {
        installDependence () {
            // this.$loading({
            //     text: '安装可能需要几分钟，请耐心等待'
            // });
            this.$apollo.mutate({
                mutation: gql`mutation($name: String!, $type: String!) {
                    installDependence(name: $name, type: $type)
                }`,
                variables: {
                    ...this.form
                }
            }).then((res) => {
                console.log(res.data);
                this.dialogFormVisible = false;
            });
        }
    },
    components: {
        PageHeader,
        ListItem,
        SearchInput
    },
    created () {
    }
};
</script>

<style lang="less" scoped>
.install-btn {
    margin-left: 20px;
}
.content {
    h2 {
        margin: 16px;
        color: #6a8bad;
        font-size: 18px;
        font-weight: normal;
    }
}
</style>